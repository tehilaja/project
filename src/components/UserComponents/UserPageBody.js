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
                    reffered: orgTree.key.referred_doners,
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
        window.scrollTo({
            top: 1250,
            left: 0,
            behavior: 'smooth'
          });
        // console.log('organization 1:\n' + JSON.stringify(orgTree));
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
                    myMonthlyDonation={org.myMonthlyDonation} myStatus={org.myStatus} reffered={org.reffered}
                    collected={org.collected}
            />
            </div>
            //     <Popup
            //     trigger={<UserOrgCard key={org.key} imgUrl={org.imgUrl} orgName={org.name} orgId={org.id}
            //         myMonthlyDonation={org.myMonthlyDonation} myStatus={org.myStatus} reffered={org.reffered}
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
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Grid container stackable verticalAlign='middle'>
                        <UserAvatar size={100} name={this.state.userName} />
                        <Grid.Row>
                            <Grid.Column width={15} padding={5}>
                    <Segment color='red'>
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
									customTransition="all .5"
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
                    { this.state.treeDownline &&<Header as='h2'>
                    <Icon name='users'></Icon>
                    {`My downline for ${this.state.orgsTrees[this.state.orgId].org_name}:`}
                    </Header>}

                            </Grid.Column>
                            {/* <Grid.Column floated='right' width={6}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                    Create an online platform for ongoing donations
                    </Header>
                    <Image bordered rounded size='large' src='https://i.insider.com/5ab2a71c5851aebb008b46da?width=3100&format=jpeg&auto=webp' />
                    <Button primary size='huge'>
                        Get Started
                        <Icon name='right arrow' />
                    </Button>
                </Grid.Column> */}
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

                    {this.adminButtons()}

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
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Container text>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Build. Create. Inspire others.
                </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Instead of focusing on content creation and hard work, we have learned how to master the
                            art of doing nothing by providing massive amounts of whitespace and generic content that
                            can seem massive, monolithic and worth your attention.
                </p>
                        <Button as='a' size='large'>
                            Read More
                </Button>

                        <Divider
                            as='h4'
                            className='header'
                            horizontal
                            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                        >
                            <a href='#'>Case Studies</a>
                        </Divider>

                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Did We Tell You About Our?
                </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                            it's really true. It took years of gene splicing and combinatory DNA research, but our
                            bananas can really dance.
                </p>
                        <Button as='a' size='large'>
                            I'm Still Quite Interested
                </Button>
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
            .map(org => <Button onClick={() => onClickFunc(org)}>
                 <Icon name='edit' />
                edit {org.org_name} page</Button>);
    }

}
export default UserPage;
