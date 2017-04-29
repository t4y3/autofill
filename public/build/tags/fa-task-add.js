riot.tag2('fa-task-add', '<h1>Add</h1> <div class=""> <input ref="task_name" type="text" placeholder="address" value=""> <span if="{isError}">{errorMessage}</span> </div> <div class="fa-buttons"> <div class="fa-button"><a class="button button-outline button-small" href="#" onclick="{cancel}">Cancel</a></div> <div class="fa-button"><a class="button button-small" href="#" onclick="{addTask}">Add</a></div> </div>', 'fa-task-add,[data-is="fa-task-add"]{ display: block; } fa-task-add span,[data-is="fa-task-add"] span{ padding-left: 5px; font-size: 1.4rem; color: #f44336; } fa-task-add .fa-buttons,[data-is="fa-task-add"] .fa-buttons{ display: flex; margin-top: 20px; } fa-task-add .fa-button:first-child,[data-is="fa-task-add"] .fa-button:first-child{ margin-left: auto; margin-right: 20px; }', '', function(opts) {
    this.on('before-mount', () => {
      this.mixin('faObs');
      this.isError = false;
      this.errorMessage = '';
      getTaskList();
    });

    this.cancel = () => {
      this.faObs.trigger('change_scene', 'list');
    };

    this.addTask = (e) => {
      e.preventDefault();

      const name = this.refs['task_name'].value;

      if (!(/\S/.test(name))) {
        this.isError = true;
        this.errorMessage = 'Please enter';
        this.update();
        return;
      }

      let maxId = 0;
      for (let i = 0, length = this.tasks.length; i < length; i++) {
        if (maxId < this.tasks[i].id) {
          maxId = this.tasks[i].id;
        }
      }

      this.tasks.push({
        id: maxId + 1,
        name: name,
        count: 0
      });

      chrome.storage.local.set({ tasks: this.tasks }, (items) => {
        this.faObs.trigger('show_toast', 'normal', 'Added!!');
        this.faObs.trigger('change_scene', 'list');
      });
    };

    const getTaskList = () => {
      const obj = {};
      obj.tasks = [];

      chrome.storage.local.get(obj, (data) => {
        this.tasks = data.tasks;
        this.update();
      });
    };
});
