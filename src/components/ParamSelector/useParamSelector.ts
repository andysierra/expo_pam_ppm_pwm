import { useContext } from "react";
import { ctx } from "../../contexts/ConvertidorContext";

export const useParamSelector = () => {

  const { data, setData } = useContext(ctx);

  const onBitChange = ( target:HTMLInputElement ) => {

    let value = target.value;

    //target.disabled = true;
    setData!(prev => {
      let bits = value ? parseInt(value) : 1;
      return { ...prev, bits: bits, intervalos: Math.pow(2, bits) }
    });
  }



  const onSignChange = (value: boolean) => {
    setData!(prev => ({ ...prev, signed: value }));
  }



  const onUniformChange = (value: boolean) => {
    setData!(prev => ({ ...prev, uniforme: value }));
  }




  return {
    data, onBitChange, onSignChange, onUniformChange
  }
}
