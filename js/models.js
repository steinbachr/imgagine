!function($) {
    var Imgagine = Backbone.Model.extend({                
        getRandomImages: function() {
            var imagesPromise = this.get('imgurConnection').getRandomImages(),
                _this = this;
            $.when(imagesPromise).then(function(resp) {                
                _this.set({'pictures': new Pictures(resp.data)});                
            })
        }
    });
    
    var ImgurPic = Backbone.Model.extend({
        resize: function() {
            
        }
        
    });
    
    var Pictures = Backbone.Collection.extend({
        model: ImgurPic
    })
    
    var ImgurConnection = Backbone.Model.extend({
        initialize: function() {
            this.baseUrl = 'https://api.imgur.com/3/';
            this.clientId = '6253e11832ac8a7';
            this.clientSecret = '8d68358252970a5384dea33f1ed166fcdb2137fc';
        },
        
        /*
        @return deferred object for the fetched gallery
         */
        getRandomImages: function() {
            var PAGE_MAX = 50,
                randomPage = Math.floor((Math.random()*PAGE_MAX)+1),
                _this = this;
            this.galleryUrl = this.baseUrl + "gallery/random/random/" + randomPage;
                        
            var galleryPromise = $.ajax({
                type: 'GET',
                headers: {
                    Authorization: 'Client-ID ' + _this.clientId
                },
                url: this.galleryUrl
            });
            return galleryPromise;
        }
    });
    
    /*****----- VIEWS -----*****/
    var ImgagineView = Backbone.View.extend({        
        initialize: function() {
            this.listenTo(this.model, 'change', this.renderGrid);            
        },
        
        pics: "<% _.each(pictures, function(pic) { %> <div class=\'<% if (gridView) { %>imgur_pic<% } else { %>imgur_box_pic <% } %>\'><img src=\'<%= pic.get('link') %>\' /></div> <% }); %>",        
        renderGrid: function() {  
            this.$el.attr({'data-columns': true});
            this.$el.html(_.template(this.pics, {
                pictures: this.model.get('pictures').models,
                gridView: true
            }));
            salvattore.register_grid(this.$el.get(0));                              
            return this;
        },
        renderBox: function() {
            this.$el.html(_.template(this.pics, {
                pictures: this.model.get('pictures').models,
                gridView: false
            }));
            return this;
        }
    })
    
    
    $.fn.imgagine = function(options) {
        this.css('position', 'absolute').css('z-index', '-1');
        
        var gridViewSelector = options['gridViewSel'],
            boxViewSelector = options['boxViewSel'],
            regenerateSelector = options['regenerateSel'];
                
        var imgagine = new Imgagine({imgurConnection: new ImgurConnection()});
        var imgagineView = new ImgagineView({
            el: this, 
            model: imgagine
        });
        
        $(gridViewSelector).click(function() {
            imgagineView.renderGrid();            
        });
        $(boxViewSelector).click(function() {
            imgagineView.renderBox();            
        });
        $(regenerateSelector).click(function() {
            imgagine.getRandomImages();
        });
        
        imgagine.getRandomImages();
    }
}($)
