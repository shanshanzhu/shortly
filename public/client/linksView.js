Shortly.LinksView = Backbone.View.extend({
  // defaults: {
  //   filter: false
  // },

  className: 'links',

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },

  render: function() {
    this.$el.empty();
    return this;
  },

  addAll: function(){
    //empty
    this.collection.forEach(this.addOne, this);
  },


  filter: function(term){

    this.$el.empty();
    this.collection.where({url:term}).forEach(this.addOne, this);
  },


  addOne: function(item){
    var view = new Shortly.LinkView( {model: item} );
    this.$el.append(view.render().el);
  }

});

