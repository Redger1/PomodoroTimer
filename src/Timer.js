import React from 'react'

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.formatTimer = this.formatTimer.bind(this)
        this.continueTimer = this.continueTimer.bind(this)
        this.adjustTime = this.adjustTime.bind(this)
        this.state = {
            timeLeft: 1500,
            timer: null,
            isPaused: false
        }
    }

    startTimer(timeLeft) {
        const conntinueButton = document.querySelector('.continue')
        const pauseButton = document.querySelector('.stop')

        conntinueButton.classList.add('hidden')
        pauseButton.classList.remove('hidden')

        this.setState({
            isPaused: false
        })

        clearInterval(this.state.timer)
        let timer = setInterval(() => {
            if(!this.state.isPaused) {
                let timeLeft = this.state.timeLeft - 1
                if (timeLeft === 0) clearInterval(timer)

                this.setState({
                    timeLeft: timeLeft
                })
            }
        }, 1000)

        return this.setState({
            timeLeft: timeLeft,
            timer: timer
        })
    }

    stopTimer() {
        const conntinueButton = document.querySelector('.continue')
        const pauseButton = document.querySelector('.stop')

        conntinueButton.classList.remove('hidden')
        pauseButton.classList.add('hidden')

        this.setState({
            isPaused: true
        })
    }

    continueTimer() {
        const conntinueButton = document.querySelector('.continue')
        const pauseButton = document.querySelector('.stop')

        conntinueButton.classList.add('hidden')
        pauseButton.classList.remove('hidden')

        this.setState({
            isPaused: false
        })
    }

    formatTimer(timeLeft) {
        const minutes = Math.floor(timeLeft / 60)
        let seconds = timeLeft % 60
        if (seconds < 10) seconds = `0${seconds}`
        return `${minutes}:${seconds}`
    }

    adjustTime() {
        this.stopTimer()
        const inputMinutesLeft = document.querySelector('.timer__adjust-input').value * 60;

        this.setState({
            timeLeft: inputMinutesLeft
        })
        
        return this.state.timeLeft
    }

    render() {
        return(
            <>
                <div className="base-timer">
                    <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                        </g>
                    </svg>
                    <span className='base-timer__label'>
                        {this.formatTimer(this.state.timeLeft)}
                    </span>
                </div>
                <Button
                    changeTime={this.adjustTime}
                    startTimer={this.startTimer}
                    stopTimer={this.stopTimer}
                    continueTimer={this.continueTimer}
                    time={this.state.timeLeft}
                />
            </>
        )
    }
}

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.handleStartTimer = this.handleStartTimer.bind(this)
        this.handleStopTimer = this.handleStopTimer.bind(this)
        this.handleContinueTimer = this.handleContinueTimer.bind(this)
        this.state = {
            clicksNumber: 0,
            newTimeLeft: 1000
        }
    }

    handleStartTimer() {
        this.state.clicksNumber++
        console.log(this.state.clicksNumber)

        return this.props.startTimer(this.props.time)
    }

    handleStopTimer() {
        return this.props.stopTimer()
    }

    handleContinueTimer() {
        return this.props.continueTimer()
    }

    render() {
        return(
            <>
                <div className="timer__buttons-wrapper">
                    <button className="timer__button start" onClick={this.handleStartTimer}>Старт</button>
                    <button className="timer__button continue hidden" onClick={this.handleContinueTimer}>Продолжить</button>
                    <button className="timer__button stop" onClick={this.handleStopTimer}>Пауза</button>
                </div>
                <div className="timer__adjust">
                    <p className="timer__adjust-text">Настройте таймер</p>
                    <input type="number" placeholder="15" className="timer__adjust-input" onChange={() => this.props.changeTime()}></input>
                </div>
            </>
        )
    }
}

export default Timer