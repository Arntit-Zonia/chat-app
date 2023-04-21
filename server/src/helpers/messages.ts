import moment from "moment";

/**
 * createMessageWithTimestamp takes an object with any number of properties,
 * adds a formatted timestamp to it as the 'createdAt' property and returns the resulting object.
 *
 * @param args - An object with any number of properties.
 * @returns - The input object with an additional 'createdAt' property containing a formatted timestamp.
 */
const createMessageWithTimestamp = (args: { [key: string]: any }) => {
  const formattedTimestamp = moment(new Date().getTime()).format("HH:mm:ss a");

  return { ...args, createdAt: formattedTimestamp };
};

export default createMessageWithTimestamp;
