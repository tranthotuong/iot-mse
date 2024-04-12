import React, { Component } from 'react'
import { StyleProp, View, TextStyle, StyleSheet } from 'react-native'

interface Props {
    style?: StyleProp<TextStyle>,
    flex?: any,
    row?: boolean,
    column?: boolean,
    center?: boolean,
    middle?: boolean,
    right?: boolean,
    space?: string,
    children?: React.ReactNode,
}

export default class Block extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }
    render() {
        const { flex, row, column, center, middle, right, space, style, children, ...props } = this.props;
        const blockStyles = [
            styles.block,
            flex && { flex },
            flex === 'disabled' && { flex: 0 },
            center && styles.center,
            middle && styles.middle,
            right && styles.right,
            space && { justifyContent: `space-${space}` },
            row && styles.row,
            column && styles.column,
            style,
        ];
        return (
            <View style={blockStyles} {...props}>
                {this.props.children}
            </View>
        )
    }
}

// styles
const styles = StyleSheet.create({
    block: {
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    center: {
        alignItems: 'center'
    },
    middle: {
        justifyContent: 'center'
    },
    right: {
        justifyContent: 'flex-end'
    },
});