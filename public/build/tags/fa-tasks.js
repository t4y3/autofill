riot.tag2('fa-tasks', '<h1 show="{!isEdit}">Task List</h1> <table show="{!isEdit}"> <thead> <tr> <th>Name</th> <th>Count</th> <th>Edit</th> <th>Run</th> </tr> </thead> <tbody> <tr each="{tasks}"> <td>{name}</td> <td>{count}</td> <td><a class="button button-small button-outline" href="#" onclick="{editTask}">Edit</a></td> <td><a class="button button-small" href="#">Run</a></td> </tr> <tr> <td></td> <td></td> <td></td> <td><a class="button button-small" href="#" onclick="{addTask}">Add</a></td> </tr> </tbody> </table> <fa-task-edit data="{items}" if="{isEdit}" callback="{backCallback}"></fa-task-edit> <fa-task-modal if="{isModalOpen}" callback="{addTaskCallback}"></fa-task-modal>', 'fa-tasks,[data-is="fa-tasks"]{ display: block; }', '', function(opts) {
        var _this = this;

        this.on('before-mount', () => {
            this.isEdit = false;
            this.tasks = this.opts.data;
            this.items = [];
            this.isModalOpen = false;
            this.update();
        });

        this.addTaskCallback = (name) => {
            this.items.push({});
            this.isModalOpen = false;
            this.update();
        };

        this.backCallback = (name) => {
            this.isEdit = false;
            this.update();
        };

        this.addTask = (e) => {
            e.preventDefault();
            this.isModalOpen = true;
            this.update();
        };

        this.editTask = function() {
            getItemList();
            _this.isEdit = true;
            _this.update();
        };

        var getItemList = function() {
            _this.items = [
                {
                    "type": "text",
                    "name": "text",
                    "value": "text_test"
                },
                {
                    "type": "textarea",
                    "name": "textarea",
                    "value": "textarea_test"
                },
                {
                    "type": "select",
                    "name": "select",
                    "value": "select_1"
                },
                {
                    "type": "checkbox",
                    "name": "checkbox",
                    "value": "true"
                },
                {
                    "type": "radio",
                    "name": "radio",
                    "value": "radio_1"
                }
            ];

            _this.update();
        };
});