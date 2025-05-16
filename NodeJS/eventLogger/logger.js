const fs = require('fs')
const os = require('os')

const EventEmitter = require('events')    //these modules can be treated as classes

class Logger extends EventEmitter{
    log(message){                         //creating a custom method log
      this.emit('message', {message})     //emit is used to broadcasts that the event has happened
    }     //take message as the key-value pair
}

const logger = new Logger()     //creating object of the clsss Logger

const logFile = './eventlog.txt'  //refernce of our file to dump the info

const logToFile = (event) => {                  //dumping data to the file
    const logMessage = `${new Date().toISOString()} - ${event.message} \n`

    fs.appendFileSync(logFile, logMessage)
    //appending the logmessage to the file using inbuilt method, it takes two arguments- path and data
}
 
logger.on('message', logToFile)   //continuously listening for an event named "message" and executes logTOFile
//hence the name event driven architecture
// logger.once      listens only once

//name for listener and emmiter should be same or else they wont be able to communicate

setInterval(() => {
  const memoryUsage = (os.freemem / os.totalmem) * 100      //using inbuilt methods to pull out system data
  logger.log(` Current Memory Usage:  ${memoryUsage.toFixed(2)}`)  //calling logger.log to start emiting the info
}, 3000)

logger.log('Application started')
logger.log("Application event occurred");
