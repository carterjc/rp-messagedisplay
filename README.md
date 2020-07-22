# rp-messagedisplay
A repository for a likely overengineered project to display messages to a Raspberry Pi.

## Goal
The goal of this project was to engineer a box akin to [this 'love box'](https://en.lovebox.love/). In short, messages
would appear on a display, granting the user a notification of some fashion when one arrives. For the aforementioned box,
a motor would shake a heart, for my design, a LED would turn on. The user would then read the message and press a button
to signal that it has been successfully received.

## Specs
The brains behind this design is a Raspberry Pi 3B+. I'm not positive, but I believe this was a little much, but as I had
a spare and knew my way around Python and Raspbian well, I used it.

From the RP, I attached a small, red LED, a button like [this one](https://www.amazon.com/Black-Dark-Sanwa-Buttons-OBSF-30-B/dp/B004R6EAYA/ref=pd_lpo_21_t_0/145-1616432-5480327?_encoding=UTF8&pd_rd_i=B004R6EAYA&pd_rd_r=dc7f6425-97a0-406d-ae73-2651efb8e915&pd_rd_w=MSnHK&pd_rd_wg=oa4kh&pf_rd_p=7b36d496-f366-4631-94d3-61b87b52511b&pf_rd_r=266ZS8FP73QGXJX53QG2&psc=1&refRID=266ZS8FP73QGXJX53QG2),
and a 20x4 LCD [screen](https://www.ebay.com/itm/2004-204-20X4-Blue-LCD-Serial-Character-Module-Display-IIC-I2C-TWI-Arduino-kit/293618709690)

(I used [this](https://www.youtube.com/watch?v=3XLjVChVgec) video to connect my RP to the 20x4 display)

## Parts
There were a few parts to this project - some of which I have never previously engaged with. I would define the aspects
of the project as the following:

1. Frontend
2. Backend/API (again, likely overengineered)
3. mySQL Database
4. Box to store internals
5. Wiring external modules to GPIO pins

## Frontend

The frontend display esd created largely in part to [the-raspberry-pi-guy](https://github.com/the-raspberry-pi-guy/lcd/tree/master/installConfigs).
I used his display drivers (though he might have got them from somewhere else) and other basic code to interact with the LCD.

As detailed in the main.py file in the frontend section, I implemented some simple logic and detailed some functions to query
my custom API. I created a basic flow chart that determined the flow of the program as a whole.

This part was very easy, though I made a few silly mistakes.

I configured the RP to connect to the designated WiFi network at boot and configured /etc/rc.local to run the main.py script
after waiting. This might not be the best way, but it does work.

## Backend

I quickly whipped up a Node/Express API using a previous template I made that interacted with mySQL. I would like to make
it more production-esque by adding more features or something, but I'm unsure how to proceed.

After creating the API, I eventually ported it to Docker with the database and exposed the VM at port 3000 to the world
through the magic of port forwarding. The major drawback here is that the use of a dynamic public IP address will eventually
break the program in the event that my public IP changes. Maybe a type of dynamic DNS can be used to combat this.

## mySQL Database

I opted to use mySQL for this project because I recently took a class and loved the relational nature of SQL. I racked my
brain to throw in some extra relations and created an actions table that logs when a message is fetched and read which
utilizes foreign keys.

The database design is very simple, though I wish I would have spent more time and fleshed it out further.

## Box

My expertise, if you would call it that, lies in coding and less engineering; however, I went outside of my comfort zone
and created a custom box to house the internals which turned out very nicely, thanks to my dad.

Roughly, the measurements were about 5 in. x 5 in. x 5 in., so a cube. The LCD panel was attached to a piece of wood just
under the top of the box and a hinge was placed above it to create a top. Holes were drilled for the button and the LED
and in the back for airflow and port access.

There are things I would have done differently, but, again, I am happy with how things turned out.

## Wiring

This is my biggest complaint with the project as I was largely unsure what to do. I do not have much experience tinkering
with physical hardware, so it was a fun challenge, but I did not know how to correctly secure the cables. Either the header
pins I used were absolute junk, or I should have soldered wires directly to the GPIO headers on the RP. I'm unsure and will 
be looking to improve next time.

In short, the cables are very iffy and I wish I did better in that aspect.

## Conclusion

So, that's it. I worked on a time crunch to get this out for a special birthday and had a lot of fun. I learned about Docker,
physical things, engineering, woodworking, and more - a great project.

The end result met much approval, so I'm happy.
