define(['base/js/namespace','base/js/dialog', 'jquery'],function(IPython, dialog, $){
    
    var get_pug_url = function(type){
	var deferred = $.Deferred();
	
	if(type == 'boris'){
	    pugUrl = 'http://cdn.meme.am/instances/500x/63378912.jpg';
	    deferred.resolve(pugUrl, type);
	} else if(type == 'doug'){
	    pugUrl = 'http://a2.files.blazepress.com/image/upload/c_fit,cs_srgb,dpr_1.0,q_80,w_620/MTI4OTkzMTgxNjA1MDIxNzA2.jpg';
	    deferred.resolve(pugUrl, type);
	} else if(type == 'random'){
	    // get the last 25 posts to the r/pics subreddit that have the word pug
	    var redditUrl = 'https://www.reddit.com/r/pics/search.json?q=pug&sort=new';
	    $.ajax({
                url: redditUrl,
                type: "GET",
                success: function(response) {
		    var posts = response.data.children;
		    for(n in posts){
			pugUrl = posts[n].data.url;
			// find the first one with an imgur link
			if(pugUrl.match(/imgur/)){
			    // and convert the imgur link from gallery view
			    // to jpg
			    pugUrl = pugUrl.replace('imgur', 'i.imgur');
			    pugUrl = pugUrl.replace('/gallery/', '/');
			    pugUrl = pugUrl + '.jpg'
			    deferred.resolve(pugUrl, type);
			}
		    }
		}
	    });
	}
	
	return deferred.promise();
    }
    
    var insert_pug = function(env, type){
	get_pug_url(type).then(function(pugUrl, type){
	    selected_cell = env.notebook.get_selected_cell();
	    selected_cell.set_text('<img src="' + pugUrl + '">');
	    env.notebook.to_markdown();
	    env.notebook.execute_cell_and_select_below();
	});
    }
    
    var pugme = {
        help: 'Insert a Photo of a Pug',
        icon : 'custom-pugs',//'fa-flask',
        help_index : '',
        handler : function (env) {
            var on_success = undefined;
            var on_error = undefined;
	    
            var p = $('<p/>').text('Choose one of the following options:')
            var div = $('<div/>')
            div.append(p)
	    
            function insert_boris(){
                insert_pug(env, 'boris');
            }
	    
            function insert_doug(){
                insert_pug(env, 'doug');
            }
	    
            function insert_random(){
                insert_pug(env, 'random');
            }
	    
            dialog.modal({
                body: div ,
                title: 'What kind of pug photo would you like to insert?',
                buttons: {'Boris the Pug':{class:'btn-primary',
					   click: insert_boris
					  },
			  'Doug the Pug':{class:'btn-primary',
					  click: insert_doug
					 },
			  'Random Pug':{class:'btn-primary',
					click: insert_random
				       },
                          'Cancel':{}
			 },
                notebook:env.notebook,
                keyboard_manager: env.notebook.keyboard_manager,
            })
        }
    }
    
    function _on_load(){
        console.info('Loaded pugme extension...')
	
        // register our new action
        var action_name = IPython.keyboard_manager.actions.register(pugme, 'pugme', 'Pugs')
	
	// add it to the toolbar
        IPython.toolbar.add_buttons_group(['Pugs.pugme'])
	
	// replace the font awesome icon with some text of our own;
	// check if we have internet, and if we do load our favicon
	// first check the navigator, but if that fails really check
	// by loading a page
	if(navigator.onLine){
	    $('.custom-pugs').replaceWith('<img src="http://textemoticons.net/wp-content/uploads/2013/03/pugstanding.gif" height=20 alt="PugMe"></img>')
	} else {
	    $.ajax({
		url: 'http://cors.io/?u=http://textemoticons.net/wp-content/uploads/2013/03/pugstanding.gif',
		type: 'GET',
		success: function() {
		    $('.custom-pugs').replaceWith('<img src="http://textemoticons.net/wp-content/uploads/2013/03/pugstanding.gif" height=20 alt="Send to Civis"></img>')
		},
		error: function() {
		    $('.custom-pugs').replaceWith('PugMe')
		}
	    });
	}
	
    }
    
    return {load_ipython_extension: _on_load };
});
