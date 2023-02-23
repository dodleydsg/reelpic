const resetModes = {
  PENDING: "pending", // reset token sent but hasn't been verified yet
  INCOMING: "incoming", // reset token verified and waiting for reset
  LOCKED: "locked", // no token sent, reset is not permitted
};

export default resetModes;
