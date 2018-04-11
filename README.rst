cacahuate-web-socket
====================

** Listening messages from rabbitmq **

This code listen messages from the emiter to the browser using node.js --socket.io

Develop
-------

You will need **node.js** and **rabbitmq** for this to work.

.. code-block:: bash

   git clone git@github.com:tracsa/cacahuate-web-socket.git && cd cacahuate-web-socket
   npm install --save express@4.15.2
   npm install --save socket.io
   npm install amqplib

Application
-----------

Just run:

.. code-block:: bash

   node index.js

And the server in port 3000 its waiting for messages...

Web-browser
-----------

You need access to

.. code-block:: bash

   http://localhost:3000/


And the server in port **3000** its waiting for messages...


Emit messages
-----------

Just run in **another terminal**:

.. code-block:: bash

   node cacahuate-web-socket/emit_log.js

END
