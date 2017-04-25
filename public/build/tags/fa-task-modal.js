riot.tag2('fa-task-modal', '<div class="fa-modal-inner"> <div class="row"> <div class="column column-50"><input ref="task_name" type="text" placeholder="NAME" value=""></div> <div class="column column-25"><a class="button button-small" href="#" onclick="{cancel}">Cancel</a></div> <div class="column column-25"><a class="button button-small" href="#" onclick="{addTask}">Add</a></div> </div> </div>', 'fa-task-modal,[data-is="fa-task-modal"]{ display: flex; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #fff; } fa-task-modal .fa-modal-inner,[data-is="fa-task-modal"] .fa-modal-inner{ width: 80%; padding: 5%; }', '', function(opts) {
        this.on('before-mount', () => {
            this.mixin('faObs');
        });

        this.cancel = () => {
            this.faObs.trigger('cancel');
        };

        this.addTask = (e) => {
            e.preventDefault();

            const name = this.refs['task_name'].value;

            const tasks = this.opts.data;

            let maxId = 0;
            for (var i = 0, length = tasks.length; i < length; i++) {
                if (maxId < tasks[i].id) {
                    maxId = tasks[i].id;
                }
            }

            tasks.push({
                id: maxId + 1,
                name: name,
                count: 0
            });

            chrome.storage.local.set({ tasks: tasks }, (items) => {
                this.faObs.trigger('add_task', tasks);
            });
        };
});
