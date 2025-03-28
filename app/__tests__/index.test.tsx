import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Index from "../index";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, title: "Mock Task 1", completed: false },
        { id: 2, title: "Mock Task 2", completed: true },
      ]),
  })
) as jest.Mock;

describe("Index (Task List screen)", () => {
  it("renders fetched tasks", async () => {
    const { getByText } = render(<Index />);
    await waitFor(() => {
      expect(getByText("Mock Task 1")).toBeTruthy();
      expect(getByText("Mock Task 2")).toBeTruthy();
    });
  });

  // TODO: Fix the test, somehow changeText is not working.
  it.skip("adds a new task to the list", async () => {
    const { getByTestId, getByText, findByText } = render(<Index />);

    const input = getByTestId("task-input");
    const addButton = getByText("Add");

    fireEvent.changeText(input, "New Task");
    fireEvent.press(addButton);

    const newTask = await findByText("New Task");
    expect(newTask).toBeTruthy();
  });

  it("hides completed task when switched to incomplete-only mode", async () => {
    const { getByText, getByRole, getAllByRole, queryByText } = render(
      <Index />
    );

    await waitFor(() => getByText("Mock Task 1"));

    const checkboxes = getAllByRole("checkbox");
    fireEvent(checkboxes[0], "valueChange", true);

    const switchToggle = getByRole("switch");
    fireEvent(switchToggle, "valueChange", true);

    expect(queryByText("Mock Task 1")).toBeNull();
  });

  it('shows "No remaining tasks" when no incomplete tasks', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [{ id: 1, title: "All Done", completed: true }],
    });

    const { getByText, getByRole } = render(<Index />);
    const switchToggle = await waitFor(() => getByRole("switch"));

    fireEvent(switchToggle, "valueChange", true);

    await waitFor(() => {
      expect(getByText("No remaining tasks!")).toBeTruthy();
    });
  });
});
