riot.tag2('fa-tasks', '<h1>List</h1> <table> <thead> <tr> <th>Name</th> <th>Run</th> </tr> </thead> <tbody> <tr each="{tasks}"> <td><a href="#" data-task-id="{id}" onclick="{editTask}">{name}</a></td> <td><a class="button button-small" href="#">Run</a></td> </tr> <tr> <td></td> <td><a class="button button-small" href="#" onclick="{addTask}">Add</a></td> </tr> </tbody> </table>', 'fa-tasks,[data-is="fa-tasks"]{ display: block; }', '', function(opts) {
        this.on('before-mount', () => {
            this.mixin('faObs');
            this.tasks = [];

            getTaskList();
        });

        this.addTask = (e) => {
            this.faObs.trigger('change_scene', 'add');
        };

        this.editTask = function(e) {
            this.faObs.trigger('change_scene', 'edit', e.target.dataset.taskId);
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
