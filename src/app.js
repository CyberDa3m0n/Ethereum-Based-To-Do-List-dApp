App = {
  loading: false,
  tasks: [], // Task storage

  load: async () => {
    // Initialize the app
    await App.render();
  },

  render: async () => {
    if (App.loading) return;

    App.setLoading(true);

    // Render all tasks
    await App.renderTasks();

    App.setLoading(false);
  },

  renderTasks: async () => {
    const $taskTemplate = $(".taskTemplate");

    // Clear the task lists
    $("#taskList").empty();
    $("#completedTaskList").empty();

    // Loop through tasks and append them to the respective lists
    App.tasks.forEach((task, index) => {
      const taskId = index + 1;
      const taskContent = task.content;
      const taskCompleted = task.completed;

      // Clone the template
      const $newTaskTemplate = $taskTemplate.clone();
      $newTaskTemplate.find(".content").html(taskContent);
      $newTaskTemplate
        .find("input")
        .prop("name", taskId)
        .prop("checked", taskCompleted)
        .on("click", () => App.toggleCompleted(taskId));

      // Append the task to the appropriate list
      if (taskCompleted) {
        $("#completedTaskList").append($newTaskTemplate);
      } else {
        $("#taskList").append($newTaskTemplate);
      }

      // Show the task
      $newTaskTemplate.show();
    });
  },

  createTask: async () => {
    // Get the new task content
    const content = $("#newTask").val().trim();

    // Add a new task only if it's not empty
    if (content) {
      App.tasks.push({ content, completed: false }); // Add to task array
      $("#newTask").val(""); // Clear input field
      await App.render(); // Re-render the tasks
    }
  },

  toggleCompleted: async (taskId) => {
    // Toggle the `completed` status of the task
    const task = App.tasks[taskId - 1];
    task.completed = !task.completed;

    // Re-render the tasks
    await App.render();
  },

  setLoading: (boolean) => {
    App.loading = boolean;

    // Show or hide loader
    const loader = $("#loader");
    const content = $("#content");
    if (boolean) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  },
};

$(() => {
  $(window).load(() => {
    App.load();
  });
});
