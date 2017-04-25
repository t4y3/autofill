<fa-root>
    <!-- tag -->
    <fa-tasks if="{ scene === 'list' }"></fa-tasks>

    <fa-task-edit task-id="{ taskId }" if="{ scene === 'edit' }"></fa-task-edit>

    <fa-task-modal if="{ scene === 'add' }"></fa-task-modal>

    <style>
        :scope {
            display: block;
        }
    </style>

    <script>

        this.scene = 'list';

        this.on('before-mount', () => {
            this.mixin('faObs');
            // this.isEdit = false;
            // this.tasks = [];
            // this.items = [];
            // this.isModalOpen = false;
            //
            // // タスクを取得
            // getTaskList();
            //
            // /**
            //  * タスク追加処理のキャンセル
            //  */
            // this.faObs.on('cancel', () => {
            //     this.isModalOpen = false;
            //     this.update();
            // });
            //
            // /**
            //  * タスク更新時の処理
            //  */
            // this.faObs.on('add_task', (data) => {
            //     this.tasks = data;
            //     this.isModalOpen = false;
            //     this.update();
            // });

            /**
             * シーン切り替え
             */
            this.faObs.on('change_scene', (scene, option = null) => {
                this.scene = scene;
                if (scene === 'edit') {
                    this.taskId = option;
                }

                this.update();
            });
        });

    </script>

</fa-root>
