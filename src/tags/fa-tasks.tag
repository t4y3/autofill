<fa-tasks>
    <h1 show="{ !isEdit }">Task List</h1>
    <table show="{ !isEdit }">
        <thead>
            <tr>
                <th>Name</th>
                <th>Count</th>
                <th>Edit</th>
                <th>Run</th>
            </tr>
        </thead>
        <tbody>
            <tr each="{ item, i in tasks }">
                <td>{ item.name }</td>
                <td>{ item.count }</td>
                <td><a class="button button-small button-outline" href="#" onclick="{ editTask.bind(this, item.id) }">Edit</a></td>
                <td><a class="button button-small" href="#">Run</a></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td><a class="button button-small" href="#" onclick="{ addTask }">Add</a></td>
            </tr>
        </tbody>
    </table>

    <fa-task-edit data="{ items }" if="{ isEdit }" callback="{ backCallback }"></fa-task-edit>

    <fa-task-modal if="{ isModalOpen }" callback="{ addTaskCallback }"></fa-task-modal>

    <style>
        :scope {
            display: block;
        }
    </style>

    <script>
        var request = require('superagent');
        var _this = this;

        this.on('before-mount', () => {
            this.isEdit = false;
            this.tasks = this.opts.data;
            this.items = [];
            this.isModalOpen = false;
        });

        this.addTaskCallback = (name) => {
            this.items.push({})
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

        this.editTask = function(id) {
            getItemList();
            _this.update();
        };

        var getItemList = function() {
            request
                .get('http://localhost:3006/items')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (res.ok) {
                        _this.isEdit = true;
                        _this.items = res.body;
                        _this.update();
                    } else {
                        // error
                    }
                }
            );
        };
    </script>

</fa-tasks>