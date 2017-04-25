riot.tag2('fa-root', '<fa-tasks if="{scene === \'list\'}"></fa-tasks> <fa-task-edit task-id="{taskId}" if="{scene === \'edit\'}"></fa-task-edit> <fa-task-modal if="{scene === \'add\'}"></fa-task-modal>', 'fa-root,[data-is="fa-root"]{ display: block; }', '', function(opts) {

        this.scene = 'list';

        this.on('before-mount', () => {
            this.mixin('faObs');

            this.faObs.on('change_scene', (scene, option = null) => {
                this.scene = scene;
                if (scene === 'edit') {
                    this.taskId = option;
                }

                this.update();
            });
        });

});
