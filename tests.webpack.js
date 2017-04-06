var context = require.context('./test', true, /.js$/);
context.keys().forEach(context);

// var context = require.context('./scripts', true, /.js$/);
// context.keys().forEach(context)
