# pugme-jupyter

To install the extension:

```
git clone git@github.com:mdagost/pugme-jupyter.git
cd pugme-jupyter
jupyter-nbextension install pugme-jupyter
```

Go into a notebook and to the following (you only need to do this setup once):

```
from notebook.services.config import ConfigManager
ip = get_ipython()
cm = ConfigManager(parent=ip, profile_dir=ip.profile_dir.location)
cm.update('notebook', {"load_extensions": {"pugme": True}})
```

Voila!  You should now see a pug icon in the notebook toolbar.

Note: This has only been tested with jupyter 4.0.6.
