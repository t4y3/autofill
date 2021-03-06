fa-root
  fa-task-list(if="{ scene === 'list' }")
  fa-task-edit(task-id="{ taskId }" if="{ scene === 'edit' }")
  fa-task-add(if="{ scene === 'add' }")
  fa-toast

  style.
    :scope {
      display: block;
    }

  script.

    this.scene = 'list';

    this.on('before-mount', () => {
      this.mixin('faObs');

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
