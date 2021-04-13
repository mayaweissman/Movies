import React, { Component } from "react";
import { PlantModel } from "../../models/plantModel";
import { ToxinModel } from "../../models/toxinModel";
import { store } from "../../redux/store";
import "./toxins.css";

interface ToxinsProps {
  plant: PlantModel;
}

interface ToxinsState {
  toxins: ToxinModel[];
}

export class Toxins extends Component<ToxinsProps, ToxinsState> {
  public constructor(props: ToxinsProps) {
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
          <div
            className={
              this.isHelpForToxin(t.id as number) ? "toxin active" : "toxin"
            }
          >
            <span className="toxin-name">{t.shortName}</span>
          </div>
        ))}
      </div>
    );
  }
}
