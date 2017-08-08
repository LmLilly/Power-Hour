module.exports = function(sequelize, DataTypes) {
  var TimeEntries = sequelize.define("TimeEntries", {
    // Sets up Time Entries table columns with data types
    time_entry_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
      validate: {
        isDate: true
      }
    },
    start_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [3, 4]
      }
    },
    end_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [3, 4]
      }
    },
    description: {
      type: DataTypes.TEXT, // String = 255 characters
      allowNull: true
    },
    total_hours: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    pay_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    total_pay: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    time_entry_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    // underscored: true,
}, {
    validate: {
    bothTimesOrNone() {
      if ((this.start_time === null) !== (this.end_time === null)) {
        throw new Error('Requires either both start time and end time or neither');
      }
    }
  }
  });

  TimeEntries.associate = function(models) {

    TimeEntries.belongsTo(models.Users, {
      foreignKey: 'user_id',
      onDelete: "cascade"
    });
    TimeEntries.belongsTo(models.Clients, {
      foreignKey: 'client_id',
    });
    TimeEntries.belongsTo(models.Projects, {
      foreignKey: 'project_id',
    });

  };
  return TimeEntries;
};