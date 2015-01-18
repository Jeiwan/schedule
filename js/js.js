var Item = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

var List = Backbone.Collection.extend({
  model: Item
});

var ItemView = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click .remove': 'destroy'
  },
  initialize: function() {
    _.bindAll(this, 'remove');
    this.model.bind('remove', this.remove);
  },
  render: function() {
    $(this.el).html(this.model.get('title') + '<span class="remove">x</span>');
    return this;
  },
  destroy: function() {
    this.model.destroy();
  },
  remove: function() {

    $(this.el).remove();
  }
});

var ListView = Backbone.View.extend({
  el: $('body'),
  events: {
    'click button#add': 'addItem'
  },
  initialize: function() {
    this.collection = new List();
    this.collection.bind('add', this.appendItem);
    this.render();
  },
  render: function() {
    $(this.el).append('<input id="input"></input><button id="add">Add</button>');
    $(this.el).append('<ul id="list"></ul>');
  },
  addItem: function() {
    var $input = $('#input');
    
    if ($input.val().length > 0) {
      var item = new Item({title: $input.val()});
      $input.val('');
      this.collection.add(item);
    } else {
      alert('Item is empty!');
    }
  },
  appendItem: function(item) {
    var itemView = new ItemView({
      model: item
    });
    $('#list').append(itemView.render().el);
  }
});

var listView = new ListView();
