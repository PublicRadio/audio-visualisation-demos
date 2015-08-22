import React, {Component} from 'react';

export class Canvas extends Component {
    static contextName = '2d';

    componentWillUnmount () {
        this.canvasElement = this.canvasContext = null;
        window.removeEventListener('resize', this.bindedRecalc);
    }

    prepare () {

    }

    recalc () {
        if (!this.canvasElement)
            return;
        this.canvasElement.width = this.width = this.canvasElement.clientWidth;
        this.canvasElement.height = this.height = this.canvasElement.clientHeight;
        this.canvasContext =
            this.constructor.contextOptions
                ? this.canvasElement.getContext(this.constructor.contextName, this.constructor.contextOptions)
                : this.canvasElement.getContext(this.constructor.contextName);
        this.prepare(this.canvasContext, this.width, this.height);
        this.draw(this.canvasContext, this.width, this.height);
    }

    componentDidMount () {
        this.canvasElement = React.findDOMNode(this);
        window.addEventListener('resize', this.bindedRecalc = this.recalc.bind(this));
        this.recalc();
    }

    render () {
        if (this.canvasElement && this.canvasContext)
            this.draw(this.canvasContext, this.width, this.height);

        return <canvas style={{width: '100%', height: '100%'}}/>;
    }
}