<fa-tasks>
    <h1 show="{ !isEdit }">Task List</h1>
    <table show="{ !isEdit }">
        <thead>
            <tr>
                <th>Name</th>
                <th>Edit</th>
                <th>Run</th>
            </tr>
        </thead>
        <tbody>
            <tr each="{ tasks }">
                <td>{ name }</td>
                <td><a class="button button-small button-outline" href="#" data-task-id="{ id }" onclick="{ editTask }">Edit</a></td>
                <td><a class="button button-small" href="#">Run</a></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td><a class="button button-small" href="#" onclick="{ addTask }">Add</a></td>
            </tr>
        </tbody>
    </table>

    <!-- タスク編集画面 -->
    <fa-task-edit task-id="{ editTaskId }" data="{ items }" if="{ isEdit }" callback="{ backCallback }"></fa-task-edit>

    <!-- タスク追加画面 -->
    <fa-task-modal data="{ tasks }" if="{ isModalOpen }"></fa-task-modal>

    <style>
        :scope {
            display: block;
        }
    </style>

    <script>
        this.on('before-mount', () => {
            this.mixin('faObs');
            this.isEdit = false;
            this.tasks = [];
            this.items = [];
            this.isModalOpen = false;

            // タスクを取得
            getTaskList();

            /**
             * タスク更新時の処理
             */
            this.faObs.on('update_tasks', (data) => {
                this.tasks = data;
                this.isModalOpen = false;
                this.update();
            });
        });

        /**
         * 編集画面から一覧画面へ戻る処理
         */
        this.backCallback = (name) => {
            this.isEdit = false;
            this.update();
        };

        /**
         * タスク追加処理
         * @param {object} e イベントオブジェクト
         */
        this.addTask = (e) => {
            e.preventDefault();
            this.isModalOpen = true;
            this.update();
        };

        /**
         * タスク編集処理
         * @param {object} e イベントオブジェクト
         */
        this.editTask = function(e) {
            getItemList(e.target.dataset.taskId);
        };

        /**
         * タスク一覧の取得処理
         */
        var getTaskList = () => {
            var obj = {};
            obj.tasks = [];

            chrome.storage.local.get(obj, (data) => {
                this.tasks = data.tasks;
                this.update();
            });
        };

        /**
         * アイテム一覧の取得処理
         * @param  {string} id タスクID
         */
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
    </script>

</fa-tasks>