import React from 'react'

import { Div } from '@vkontakte/vkui'

import {} from '@vkontakte/icons'
import { TimerReverse } from './TimerReverse'
import { createPortal } from 'react-dom'
const portal = document.getElementById('portal')!

export const PrestartModal = ({
  isOpen,
  onClosePrestartModal,
}: {
  isOpen: boolean
  onClosePrestartModal: () => void
}) => {
  const handleEndTimer = () => {
    onClosePrestartModal()
  }

  if (isOpen) {
    return createPortal(
      <Div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <Div className="font-inter italic font-bold text-6xl leading-11 text-center text-white">
          <p>СТАРТ ЧЕРЕЗ</p>
          <TimerReverse isPause={false} startTime={3} onEnd={handleEndTimer} />
        </Div>
      </Div>,

      portal,
    )
  }

  // return (

  //   //
  // );
}
