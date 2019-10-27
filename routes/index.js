var express = require('express');
var router = express.Router();

router.get('/:specialty/:insurance/:lat/:long', function(req, res, next) {
  var Connection = require('tedious').Connection;
  var Request = require('tedious').Request;

  var jsonArray = [];

  // Create connection to database
  var config =
  {
      authentication: {
          options: {
              userName: 'room108hackgt', // update me
              password: 'PassswordNotReal' // update me
          },
          type: 'default'
      },
      server: 'room108hackgt.database.windows.net', // update me
      options:
      {
          database: 'Inventory1', //update me
          encrypt: true
      }
  }
  var connection = new Connection(config);

  // Attempt to connect and execute queries if connection goes through
  connection.on('connect', function(err)
      {
          if (err)
          {
              console.log(err)
          }
          else
          {
              console.log(req.params["specialty"])
              console.log(req.params["insurance"])
              queryDatabase();
          }
      }
  );

  function queryDatabase()
  {
      console.log('Reading rows from the Table...');

      // Read all rows from table
      var request = new Request(
        "DECLARE @x REAL = " + req.params["lat"] + ";DECLARE @y REAL = " + req.params["long"] + ";SELECT TOP 5 * FROM [dbo].[HealthcareProviders] WHERE Specialty='" + req.params["specialty"] + "' AND Insurance='" + req.params["insurance"] + "' AND (6371*0.621*(2*ATN2(SQRT(POWER(SIN(((Latitude*(3.14159/180))-(@x*(3.14159/180)))/2),2) + (COS((Latitude*(3.14159/180))) * COS((@x*(3.14159/180))) * POWER(SIN(((Longitude*(3.14159/180))-(@y*(3.14159/180)))/2),2))),SQRT(1-(POWER(SIN(((Latitude*(3.14159/180))-(@x*(3.14159/180)))/2),2) + (COS((Latitude*(3.14159/180))) * COS((@x*(3.14159/180))) * POWER(SIN(((Longitude*(3.14159/180))-(@y*(3.14159/180)))/2),2))))))) < 50;",
          function(err, rowCount, rows)
          {
            console.log(rowCount + ' row(s) returned');
          }
      );

      request.on('row', function(columns) {
          var rowObject = {};
          columns.forEach(function(column) {
            rowObject[column.metadata.colName] = column.value;
          });
          jsonArray.push(rowObject);
          
      });
      connection.execSql(request);
  }

  // here because hacking and ran out of time to figure out promises
  setTimeout(function(){
    res.send(jsonArray);
  }, 2000);
});

router.get('/:drug/:lat/:long', function(req, res, next) {
  var Connection = require('tedious').Connection;
  var Request = require('tedious').Request;

  var drug = req.params["drug"];

  var jsonArray = [];

  // Create connection to database
  var config =
  {
      authentication: {
          options: {
              userName: 'room108hackgt', // update me
              password: 'PassswordNotReal' // update me
          },
          type: 'default'
      },
      server: 'room108hackgt.database.windows.net', // update me
      options:
      {
          database: 'Inventory1', //update me
          encrypt: true
      }
  }
  var connection = new Connection(config);

  // Attempt to connect and execute queries if connection goes through
  connection.on('connect', function(err)
      {
          if (err)
          {
              console.log(err)
          }
          else
          {
              console.log(req.params["drug"])
              queryDatabase();
          }
      }
  );

  function queryDatabase()
  {
      console.log('Reading rows from the Table...');

      // Read all rows from table
      var request = new Request(
          "DECLARE @x REAL = " + req.params["lat"] + ";DECLARE @y REAL = " + req.params["long"] + ";SELECT TOP 5 * FROM [dbo].[ProductListWithLocation] WHERE Scientific_Name='" + drug + "' AND Availability > 0 AND (6371*0.621*(2*ATN2(SQRT(POWER(SIN(((Latitude*(3.14159/180))-(@x*(3.14159/180)))/2),2) + (COS((Latitude*(3.14159/180))) * COS((@x*(3.14159/180))) * POWER(SIN(((Longitude*(3.14159/180))-(@y*(3.14159/180)))/2),2))),SQRT(1-(POWER(SIN(((Latitude*(3.14159/180))-(@x*(3.14159/180)))/2),2) + (COS((Latitude*(3.14159/180))) * COS((@x*(3.14159/180))) * POWER(SIN(((Longitude*(3.14159/180))-(@y*(3.14159/180)))/2),2))))))) < 50 ORDER BY Price ASC;",
          function(err, rowCount, rows)
          {
            console.log(rowCount + ' row(s) returned');
          }
      );

      request.on('row', function(columns) {
          var rowObject = {};
          columns.forEach(function(column) {
            rowObject[column.metadata.colName] = column.value;
          });
          jsonArray.push(rowObject);
          
      });
      connection.execSql(request);
  }

  // here because hacking and ran out of time to figure out promises
  setTimeout(function(){
    res.send(jsonArray);
  }, 2000);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Carepress Marketplace' });
});

module.exports = router;
