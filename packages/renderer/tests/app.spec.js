import {Application} from 'spectron';
import {strict as assert} from 'assert';
import {test} from 'vitest';

const app = new Application({
  path: require('electron'),
  requireName: 'electronRequire',
  args: ['.'],
});

test('Test Window', async () => {
  app
    .start()
    .then(async () => {
      const isVisible = await app.browserWindow.isVisible();
      assert.ok(isVisible, 'Main window not visible');
    })

    .then(async () => {
      const isDevtoolsOpen = await app.webContents.isDevToolsOpened();
      assert.ok(!isDevtoolsOpen, 'DevTools opened');
    })

    .then(async function () {
      // Get the window content
      const content = await app.client.$('#root');
      assert.notStrictEqual(
        await content.getHTML(),
        '<div id="root"></div>',
        'Window content is empty',
      );
    })

    .then(function () {
      if (app && app.isRunning()) {
        return app.stop();
      }
    })

    .then(() => process.exit(0))

    .catch(function (error) {
      console.error(error);
      if (app && app.isRunning()) {
        app.stop();
      }
      process.exit(1);
    });
});
