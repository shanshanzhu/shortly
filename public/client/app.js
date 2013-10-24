window.Shortly = Backbone.View.extend({
  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="index">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
        <li><a href="#" class="sort_recent">Recent Visits</a></li> \
        <li><a href="#" class="sort_total">Total Visits</a></li> \
        <li><a href="#" class="sort_total">Total Visits</a></li> \
        <form> \
          <li><input class="search" type="text" placeholder="Filter results!" name="url"></li> \
          <li><input type="submit" value="Search"></li> \
        </form> \
      </ul> \
      </div> \
      <div id="container"></div>'
  ),

  events: {
    "click li a.index":  "indexView",
    "click li a.create": "renderCreateView",
    "click li a.sort_recent": "sort_total",
    "click li a.sort_total": "sort_recent",
    "submit" : "filter_by"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);
    this.indexFile = this.renderView(); // default view
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  indexView: function (e) {
    this.indexFile = this.renderView(e, '/links');

  },

  sort_total: function (e) {
    this.renderView(e, '/links/total');
  },

  sort_recent: function (e) {
    this.renderView(e, '/links/recent');
  },


  filter_by:  function (e) {
    //fucking preventDefault.
    e && e.preventDefault();
    var filterUrl = this.$el.find('.search').val();
    this.indexFile.filter(filterUrl);
  },


  renderView: function(e, url){
    e && e.preventDefault();
    var links = new Shortly.Links();
    if (url) {
      links.url = url;
    }
    var linksView = new Shortly.LinksView({collection: links});
    this.$el.find('#container').html( linksView.render().el );
    this.updateNav('index');//to fix
    return linksView;
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.find('#container').html( linkCreateView.render().el );
    this.updateNav('create');//to fix
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  }

});