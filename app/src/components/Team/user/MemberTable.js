import React from "react";
import TeamMember from "./TeamMember";
import TeamLeader from "./TeamLeader";
import { Redirect } from "react-router-dom";
import { Button, Statistic, Typography } from "antd";

import "./style.css";

const { Paragraph } = Typography;

class MemberTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      willBeDeleted: false,
    };
    this.handleAddRequest = this.handleAddRequest.bind(this);
    this.handleRemoveRequest = this.handleRemoveRequest.bind(this);
    this.handleChangeLeaderRequest = this.handleChangeLeaderRequest.bind(this);
    this.handleChangeCapaRequest = this.handleChangeCapaRequest.bind(this);
  }

  handleAddRequest(newMember) {
    this.props.addMember(newMember);
  }

  handleRemoveRequest(rmMember) {
    if (
      this.props.teamLeaderID === rmMember.userID &&
      this.props.members.length > 1
    ) {
      // the member to be removed is the team leader
      alert("You have to pick a new team leader first before you leave!");
    } else if (this.props.members.length === 1) {
      alert("This team will be deleted and return to course view");
      this.setState({ willBeDeleted: true });
    } else {
      this.props.deleteMember(rmMember);
    }
  }

  handleChangeLeaderRequest(newLeader) {
    this.props.changeLeader(newLeader);
  }

  handleChangeCapaRequest(newCapacity) {
    let capacity = parseInt(newCapacity);
    if (capacity >= this.props.members.length && capacity <= 10) {
      this.props.setCapacity(capacity);
    } else {
      alert("Invalid capacity number");
    }
  }

  render() {
    const {
      view,
      teamLeaderID,
      currentUser,
      members,
      teamCapacity,
    } = this.props;

    const teamLeader = members.filter(
      (member) => member.userID === teamLeaderID
    )[0];
    const teamMembers = members.filter(
      (member) => member.userID !== teamLeaderID
    );

    const renderJoinOrLeaveButton = () => {
      if (view === "otherUserView") {
        return (
          <Button
            className="joinLeaveButton"
            type="primary"
            onClick={() => this.handleAddRequest(currentUser)}
          >
            {" "}
            JOIN{" "}
          </Button>
        );
      } else {
        return (
          <Button
            className="joinLeaveButton"
            type="primary"
            onClick={() => this.handleRemoveRequest(currentUser)}
          >
            {" "}
            LEAVE{" "}
          </Button>
        );
      }
    };

    const renderCapacity = () => {
      if (view === "teamLeaderView") {
        return (
          <Paragraph
            editable={{ onChange: this.handleChangeCapaRequest, maxLength: 2 }}
          >
            / {teamCapacity}
          </Paragraph>
        );
      } else {
        return <Paragraph>/ {teamCapacity}</Paragraph>;
      }
    };

    if (this.state.willBeDeleted) {
      return <Redirect push to="/Course" />;
    }

    return (
      <div className="memberTableContainer">
        <h2> Team Members </h2>

        <TeamLeader
          teamLeader={teamLeader}
          view={view}
          members={members}
          currentUser={currentUser}
        />

        {teamMembers.map((member) => (
          <TeamMember
            key={member.userID}
            member={member}
            view={view}
            currentUser={currentUser}
            handleKickRequest={this.handleRemoveRequest}
            handleMakeLeaderRequest={this.handleChangeLeaderRequest}
          />
        ))}

        {renderJoinOrLeaveButton()}
        <Statistic
          className="teamCapacity"
          value={members.length}
          suffix={renderCapacity()}
        />
      </div>
    );
  }
}

export default MemberTable;
