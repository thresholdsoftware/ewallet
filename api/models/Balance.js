module.exports = {
  attributes: {
    
    
    balance:{
      type:'integer',
      required:true
    },
    phone:{
      type:'integer',
      required:true,
      unique:true
    }
  }
};