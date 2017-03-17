riot.tag2('fa-root', '<fa-tasks data="{tasks}"></fa-tasks>', 'fa-root,[data-is="fa-root"]{ display: block; }', '', function(opts) {
        this.on('before-mount', () => {

            this.tasks = [];

            getTaskList();
        });

        var getTaskList = () => {
            this.tasks = [
                {
                    "id": 1,
                    "name": "task_name",
                    "count": 3
                },
                {
                    "id": 2,
                    "name": "テスト",
                    "count": 10
                },
                {
                    "id": 3,
                    "name": "aaabbbccc",
                    "count": 1
                }
            ];

            this.update();
        };
});