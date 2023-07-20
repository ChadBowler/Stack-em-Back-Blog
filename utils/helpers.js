//pulled the helpers from classroom activities. Not using format_time, but it might come in handy later. format_date used for created dates on blogs and comments.
module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()
      }`;
    }
};
  