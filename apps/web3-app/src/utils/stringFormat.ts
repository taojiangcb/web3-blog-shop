

export const formatTokenBalance = (value: number): string => {  
  // 处理 0 或非数字情况  
  if (!value || isNaN(value)) return '0';  
  
  // 如果数字小于 0.000001，显示最多 6 位小数  
  if (value < 0.000001) {  
    return value.toFixed(6);  
  }  

  // 否则使用 toLocaleString 并限制小数位数  
  return value.toLocaleString('en-US', {  
    minimumFractionDigits: 0,  
    maximumFractionDigits: 4  
  });  
}; 
