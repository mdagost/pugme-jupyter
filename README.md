# pugme-jupyter ![pug](http://textemoticons.net/wp-content/uploads/2013/03/pugstanding.gif)

**Pugs in your jupyter notebook.** 

[The JupyterDay Chicago Talk](https://www.youtube.com/watch?v=Z4swQ-lUo7Y&feature=youtu.be)

To install the extension:

```
git clone git@github.com:mdagost/pugme-jupyter.git
cd pugme-jupyter
jupyter-nbextension install pugme-jupyter
```

Go into a notebook and do the following (you only need to do this setup once):

```
from notebook.services.config import ConfigManager
ip = get_ipython()
cm = ConfigManager(parent=ip, profile_dir=ip.profile_dir.location)
cm.update('notebook', {"load_extensions": {"pugme": True}})
```

Voila!  You should now see the pug icon in the notebook toolbar.

**Note: This has only been tested with notebook 4.0.6.**
