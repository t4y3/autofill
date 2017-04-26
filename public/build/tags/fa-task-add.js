riot.tag2('fa-task-add', '<h1>Add</h1> <div class="row"> <div class="column column-50"><input ref="task_name" type="text" placeholder="NAME" value=""></div> <div class="column column-25"><a class="button button-small" href="#" onclick="{cancel}">Cancel</a></div> <div class="column column-25"><a class="button button-small" href="#" onclick="{addTask}">Add</a></div> </div>', 'fa-task-add,[data-is="fa-task-add"]{ display: block; }', '', function(opts) {
    this.on('before-mount', () => {
      this.mixin('faObs');
      getTaskList();
    });

    this.cancel = () => {
      this.faObs.trigger('change_scene', 'list');
    };

    this.addTask = (e) => {
      e.preventDefault();

      const name = this.refs['task_name'].value;

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
