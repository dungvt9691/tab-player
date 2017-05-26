CKEDITOR.editorConfig = function( config ) {
  config.toolbar_Custom = [
  { name: "custom", items : ['Bold','Italic','Underline','Strike','-','NumberedList','BulletedList','-','Blockquote','SpecialChar','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','Image','Link','Unlink','-','HorizontalRule','PageBreak']},
  { name: "custom", items : ['Font','FontSize','TextColor','BGColor','-','-','Outdent','Indent','-','Source']}
  ];

  config.toolbar = 'Custom';
  config.skin    = 'bootstrapck';
  config.extraPlugins = 'image2,widget,dialog,lineutils';
  config.height = '350px';
  config.resize_enabled = false;
  config.removePlugins = 'resize';
  config.basicEntities = false;
  config.entities_greek = false; 
  config.entities_latin = false; 
  config.entities_additional = '';
};