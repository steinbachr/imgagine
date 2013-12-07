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
    var ListView = Backbone.View.extend({        
        initialize: function() {
            this.model.on('change', this.render, this);
        },
        
        picList: "<ul><% _.each(pictures, function(pic) { %> <li><img src=\"<%= pic.get('link') %>\" /></li> <% }); %></ul>",
        render: function() {
            debugger;
            this.$el.html(_.template(this.picList, {pictures: this.model.attributes.pictures.models}));
            return this;
        }
    })
    
    
    $.fn.imgagine = function(options) {
        var imgagine = new Imgagine({imgurConnection: new ImgurConnection()});        
        var view = new ListView({el: this, model: imgagine});
        
        imgagine.getRandomImages();
    }
}($)
