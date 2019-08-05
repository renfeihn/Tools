#!/bin/sh
nohup $STORM_HOME/bin/storm nimbus > /dev/null 2>&1 &
nohup $STORM_HOME/bin/storm supervisor > /dev/null 2>&1 &
nohup $STORM_HOME/bin/storm ui > /dev/null 2>&1 &
nohup $STORM_HOME/bin/storm logviewer > /dev/null 2>&1 &
