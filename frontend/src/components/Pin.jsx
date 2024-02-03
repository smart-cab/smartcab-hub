// import React, { Component } from "react";
// import PinView from './PinView.jsx';
import "./Pin.scss";

import React, { useEffect, useRef, useState } from "react"
import { Text } from "react-native"
import ReactNativePinView from "./PinView.jsx"

const Pin = () => {
  const pinCodeLength = 4
  const pinView = useRef(null)
  const [enteredPin, setEnteredPin] = useState("")

  useEffect(() => {
    if (enteredPin.length === pinCodeLength) {
      alert(enteredPin)
    }
  }, [enteredPin])

  return (
    <>
      <ReactNativePinView
        style={{
          padding: 36,
          width: "50%",
          marginLeft: "3cm",
          marginRight: "1cm",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
        inputSize={32}
        ref={pinView}
        pinLength={pinCodeLength}
        buttonSize={100}
        onValueChange={value => setEnteredPin(value)}
        inputViewEmptyStyle={{
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#000",
        }}
        inputViewFilledStyle={{
          backgroundColor: "#000",
        }}
        buttonViewStyle={{
          borderWidth: 1,
          borderColor: "#000",
        }}
        buttonTextStyle={{
          color: "#000",
        }}
        onButtonPress={key => {
          if (key === "custom_left") {
            pinView.current.clearAll()
          }
          if (key === "custom_right") {
            pinView.current.clear()
          }
        }}
        customLeftButton=<Text style={{ color: "#000", fontSize: 36 }}>↻</Text>
        customRightButton=<Text style={{ color: "#000", fontSize: 36 }}>⇐</Text>
      />
    </>
  )
}

export default Pin
