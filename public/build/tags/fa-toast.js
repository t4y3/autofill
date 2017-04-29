riot.tag2('fa-toast', '<p class="toast-text {type}">{text}</p>', 'fa-toast,[data-is="fa-toast"]{ display: block; position: fixed; top: 0; right: 0; margin: 20px; opacity: 0; transition: opacity .2s linear; } fa-toast.show,[data-is="fa-toast"].show{ opacity: 1; } fa-toast .toast-text,[data-is="fa-toast"] .toast-text{ margin: 0; padding: 5px 10px; border-radius: 5px; color: #fff; } fa-toast .toast-text.normal,[data-is="fa-toast"] .toast-text.normal{ background-color: #009688; } fa-toast .toast-text.error,[data-is="fa-toast"] .toast-text.error{ background-color: #f44336; }', 'class="{show: isShow}"', function(opts) {

    this.on('before-mount', () => {
      this.mixin('faObs');
      this.isShow = false;
      this.type = 'normal';
      this.text = '';

      this.faObs.on('show_toast', (type, text) => {
        this.isShow = true;
        this.type = type;
        this.text = text;
        this.update();

        setTimeout(() => {
          this.isShow = false;
          this.update();
        }, 3000)
      });
    });

});
