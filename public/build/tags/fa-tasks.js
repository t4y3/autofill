riot.tag2('fa-tasks', '<h1 show="{!isEdit}">Task List</h1> <table show="{!isEdit}"> <thead> <tr> <th>Name</th> <th>Edit</th> <th>Run</th> </tr> </thead> <tbody> <tr each="{tasks}"> <td>{name}</td> <td><a class="button button-small button-outline" href="#" data-task-id="{id}" onclick="{editTask}">Edit</a></td> <td><a class="button button-small" href="#">Run</a></td> </tr> <tr> <td></td> <td></td> <td><a class="button button-small" href="#" onclick="{addTask}">Add</a></td> </tr> </tbody> </table> <fa-task-edit task-id="{editTaskId}" data="{items}" if="{isEdit}" callback="{backCallback}"></fa-task-edit> <fa-task-modal data="{tasks}" if="{isModalOpen}"></fa-task-modal>', 'fa-tasks,[data-is="fa-tasks"]{ display: block; }', '', function(opts) {
        var _this = this;

        this.on('before-mount', () => {
            this.mixin('faObs');
            this.isEdit = false;
            this.tasks = [];
            this.items = [];
            this.isModalOpen = false;
            this.update();

            getTaskList();

            this.faObs.on('update_tasks', (data) => {
                this.tasks = data;
                this.isModalOpen = false;
                this.update();
            });
        });

        this.backCallback = (name) => {
            this.isEdit = false;
            this.update();
        };

        this.addTask = (e) => {
            e.preventDefault();
            this.isModalOpen = true;
            this.update();
        };

        this.editTask = function(e) {
            getItemList(e.target.dataset.taskId);
        };

        var getTaskList = () => {
            var obj = {};
            obj.tasks = [];

            chrome.storage.local.get(obj, (data) => {
                this.tasks = data.tasks;
                this.update();
            });
        };

        var getItemList = (id) => {
            var obj = {};
            obj[id] = [];
            this.editTaskId = id;

            chrome.storage.local.get(obj, (data) => {
                this.isEdit = true;
                this.items = data[id];
                this.update();
            });
        };
});