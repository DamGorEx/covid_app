import React from "react";

interface PopupProps {
    text: string,

    closePopup(): void
}

export default class Popup extends React.Component<PopupProps> {
    constructor(props: PopupProps) {
        super(props);
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <button onClick={this.props.closePopup}>ZAMKNIJ</button>
                </div>
            </div>
        );
    }
}
