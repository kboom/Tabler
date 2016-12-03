import React, {PropTypes} from "react";
import Layout from "../../layout/Layout";
import Scene from "../../rendering/scenes/Scene"

export default class HomePage extends React.Component {

    render() {
        return (
            <Layout>
                <Scene />
            </Layout>
        );
    }

}