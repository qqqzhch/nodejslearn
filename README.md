The OpenShift `nodejs` cartridge documentation can be found at:

http://openshift.github.io/documentation/oo_cartridge_guide.html#nodejs



browserify client/search.js > public/js/search.js

browserify client/shareCode.js > public/js/shareCode.js


process.env is a reference to your environment, so you have to set the variable there.

To set an environment variable in Windows:

SET NODE_ENV=development
on OS X or Linux:

export NODE_ENV=development


