import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";

import UserAvatar from 'react-avatar';

import Tree from 'react-vertical-tree';

import UserOrgCard from './UserOrgCard.js'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import axios from "axios";

import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Popup,
    Responsive,
    Segment,
    Sidebar,
    Step,
    Visibility,
} from 'semantic-ui-react'
import { AiFillCalendar } from 'react-icons/ai';


const WIDTH = 70;
const HEIGHT = 80;


class UserPage extends React.Component {
    //-----------constructor----------------------
    constructor(props) {
        super(props)
        //------state--
        this.state =
        {
            loggedIn: this.props.data.loggedIn,
            userName: this.props.data.userName,
            clickOrg: false,
            data: null,
            getOrgDownline: false,
            adminOfOrgs: undefined,
            orgsTrees: undefined,
            orgToDisplay: undefined,
            treeDownline: undefined,
        }
        this.getAdminOfOrgs();
        this.state.organizations = [];
        this.state.orgsTrees = this.getOrgsTrees();
        this.handleClick = this.handleClick.bind(this);
    }

    getOrgsTrees() {
        (async () => {
            const response = await axios.get(
                `/userOrgTrees/${this.state.userName}`
            );

            if (response.data) {
                this.setState({ orgsTrees: response.data });
            }

            const orgs = Object.keys(this.state.orgsTrees).map(orgId => {
                const orgTree = this.state.orgsTrees[orgId];
                return {
                    key: orgId,
                    imgUrl: orgTree.img_url,
                    name: orgTree.org_name,
                    id: orgId,
                    myMonthlyDonation: orgTree.key.donated,
                    myStatus: orgTree.level.level_name,
                    referred: orgTree.key.referred_donors,
                    collected: orgTree.key.collected,
                }
            });

            this.setState({ organizations: orgs })

            Object.keys(this.state.orgsTrees).forEach(orgId => {
                document.addEventListener(`userOrg${orgId}CardClicked`, () => {
                    this.setState({ treeDownline: this.getMyDownLine(orgId),
                    orgId: orgId });
                });
            });
        })();
    }

    getAdminOfOrgs() {
        (async () => {
            const response = await axios.get(
                `/${this.state.userName}/org-admin-of`
            );

            this.setState({ adminOfOrgs: response.data });
        })();
    }


     getMyDownLine(orgId) {
        const orgTree = this.state.orgsTrees && this.state.orgsTrees[orgId];
        // document.getElementById("downlineDiv").scrollIntoView();
        window.scrollTo({
            top: 1550,
            left: 0,
            behavior: 'smooth'
          });
        console.log('organization 1:\n' + JSON.stringify(orgTree));
        return ([orgTree]);
    }

    //get the information for specific user from DB
    // componentDidMount () {

    //     // ~~~~~~~~~~ get (select *) 
    //             let self = this;
    //             fetch('/data', {
    //                 method: 'GET'
    //             }).then(function(response) {
    //                 if (response.status >= 400) {
    //                     throw new Error("Bad response from server");
    //                 }
    //                 return response.json();
    //             }).then(function(data) {
    //                 self.setState({organizations: data});
    //             }).catch(err => {
    //             console.log('caught it!',err);
    //             })
    //         }

    handleClick(id) {

    }
    render() {
        // send the list of the organization for this user   
        const orgComponents = this.state.organizations.map(org => {
            return (
                <div style={{padding: '3em'}}>
                <UserOrgCard key={org.key} imgUrl={org.imgUrl} orgName={org.name} orgId={org.id}
                    myMonthlyDonation={org.myMonthlyDonation} myStatus={org.myStatus} referred={org.referred}
                    collected={org.collected}
            />
            </div>
            //     <Popup
            //     trigger={<UserOrgCard key={org.key} imgUrl={org.imgUrl} orgName={org.name} orgId={org.id}
            //         myMonthlyDonation={org.myMonthlyDonation} myStatus={org.myStatus} referred={org.referred}
            //         collected={org.collected}
            // />}
            // content='I am positioned to the right center'
            // position='right center' />
            )}
        );

        const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 5
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          };

        //-----------return------------------------------
        return (
            <div>
                <Segment style={{ padding: '5em 0em', width: '100%', background:'#F5F5F5'}} vertical>
                    <Grid container stackable verticalAlign='middle'>
                        <UserAvatar size={100} name={this.state.userName} />
                        <Grid.Row>
                            <Grid.Column width={15} padding={5}>
                    <Segment color='olive'>
									<Header as='h2' icon='globe' content='Your Donations:' width='500px' />
									<Carousel 
									centerMode={true}
									swipeable={false}
									draggable={false}
									showDots={true}
									responsive={responsive}
									ssr={true} // means to render carousel on server-side.
									infinite={true}
									autoPlay={this.props.deviceType !== "mobile" ? true : false}
									autoPlaySpeed={2000}
									keyBoardControl={true}
									// customTransition="all .5"
									// transitionDuration={500}
									containerClass="carousel-container"
									removeArrowOnDeviceType={["tablet", "mobile"]}
									deviceType={this.props.deviceType}
									dotListClass="custom-dot-list-style"
									itemClass="carousel-item-padding-40-px">
										{orgComponents}
									</Carousel>
									{/* <div style ={{display: 'flex', flexDirection: 'row', padding: '1em', margin:'1em'}}> 
										{orgComponents}
									</div> */}
								</Segment>
                    { this.state.treeDownline && 
                     <div id="downlineDiv">
                    <Header as='h2'>
                    <Icon name='users'></Icon>
                    {`My downline for ${this.state.orgsTrees[this.state.orgId].org_name}:`}
                    </Header>
                    </div>}

                            </Grid.Column>
                        </Grid.Row>
                        <br />
                        <br />
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                            {
                                    this.state.treeDownline && <Tree data={this.state.treeDownline} /> || <div></div>
                            }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br />
                    <br />
                <Segment style={{ padding: '5em 0em', width: '100%', background:'#F5F5F5'}} textAlign='center' vertical>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        <Icon name='edit'/>
                                    Your Organizations: Edit Here
                    </Header>
                    {this.adminButtons()}
                </Segment>
                </Segment>

                <Segment style={{ padding: '0em' }} vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    "What an Organization"
                    </Header>
                                <p style={{ fontSize: '1.33em' }}>That is what they all say about it</p>
                            </Grid.Column>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    "So glad to be a part of this wonderful Organization."
                    </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    <b>Wow</b> Just incredible
                    </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment style={{ padding: '8em 0em' , background:'#F5F5F5' }} vertical>
                    <Container text>
                        <Header as='h3' style={{ fontSize: '2em'}}>
                            <Icon name='building' />
                            Build. Create. Inspire others.
                </Header>
                    </Container>
                </Segment>
            </div>
        )
    }


    adminButtons() {
        if (!this.state.adminOfOrgs) {
            return null;
        }

        const onClickFunc = (org) => window.location.assign(`EditOrgPage/${org.org_id}`);

        return this.state.adminOfOrgs
            .map(org => <Button color="olive" onClick={() => onClickFunc(org)}>
                 <Icon name='edit' />
                edit {org.org_name} page</Button>);
    }

}
export default UserPage;
