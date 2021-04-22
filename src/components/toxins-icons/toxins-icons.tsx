import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { PlantModel } from "../../models/plantModel";
import { ToxinModel } from "../../models/toxinModel";
import { store } from "../../redux/store";
import "./toxins-icons.css";

interface ToxinsIconsProps {
  plant: PlantModel;
  size: string;
  src: string
}

interface ToxinsIconsState {
  toxins: ToxinModel[];
}

export class ToxinsIcons extends Component<ToxinsIconsProps, ToxinsIconsState> {
  public constructor(props: ToxinsIconsProps) {
    super(props);
    this.state = {
      toxins: [],
    };
  }

  public componentDidMount() {
    const toxins = store.getState().allToxins;
    this.setState({ toxins });
  }

  public isHelpForToxin = (toxinId: number) => {
    const tox = this.props.plant.toxins?.find((t) => t === toxinId);
    if (tox) {
      return true;
    }
    return false;
  };

  public render() {
    return (
      <div className="toxins">
        {this.state.toxins.map((t) => (
          <NavLink to={`/toxin/${t.id}`}>
            <img style={{width: this.props.size}} className="hex" src={this.isHelpForToxin(t.id as number) ? `${this.props.src}/assets/images/toxin-${t.id}.svg` : `${this.props.src}/assets/images/toxin-${t.id}-stroke.svg` }/>
          </NavLink>
        ))}
      </div>
    );
  }
}
