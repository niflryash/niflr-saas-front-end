import { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  box,
  Grid,
  Paper,
  Typography,
  Container,
  CardMedia,
  CardContent,
  Card,
  Button,
  IconButton,
} from '@mui/material';
import { Add, AbcRounded, Clear } from '@mui/icons-material';
import { connect } from 'react-redux';
import AddToCartModal from '../components/modal/addToCartModal';

import EventContainer from '../components/events/EventContainer/eventContainer';
import CartContainer from '../components/cart/CartContainer/cartContainer';
import DummyEventContainer from '../components/dummyEvents/EventContainer/eventContainer';
import { useStyles } from './styles';
import VideoSlider from '../components/videoSlider/videoSlider';
import ModalWrapper from '../components/modal/modalWrapper';

// actions
import {
  fetchEventList,
  fetchCartList,
  fetchVideoList,
  cartSaved,
  cartCleared,
  setModalState,
  updateCartTicket,
  eventsSaved,
  ticketConfirmed,
  resetEvents,
  updateTicketStatus,
  updateEventStatus,
  createCart,
  addToCart,
  resetDummyEvents,
  updateCartItemStatus,
  deleteCartItems,
  confirmEvents,
  cartconfirmed,
  dummyEventsSaved,
  fetchStoreProductsList,
  eventAddToCart,
  dummyEventAddToCart,
  updateDummyEventStatus,
  createDummyEvents,
  fetchDummyEventList,
} from '../actions';

const TicketPage = (props) => {
  // console.log(ticketId, 'ticket_id');
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [dummyEvents, setDummyEvents] = useState([]);
  const [cart, setCart] = useState([]);
  const [videos, setVideos] = useState([]);
  const [products, setProducts] = useState(null);

  const [selectedEvents, setSelectedEvents] = useState([]);

  const [areAllItemsConfirmed, setAreAllItemsConfirmed] = useState(false);

  // const [isSaved,setIsSaved]= useState([]);
  useEffect(() => {
    window.history.pushState(null, null, `tickets/${props.ticket.ticket.id}`);
    props.fetchVideoList(props.ticket.ticket.video);
    props.fetchEventList(props.ticket.ticket.weight_change_events);
    props.fetchDummyEventList([props.ticket.ticket.id]);
    props.fetchCartList(props.ticket.ticket.id);
  }, [props.ticket]);

  useEffect(() => {
    // console.log("props.ticketsupdated:", props.event);
    setEvents(props.event.events);
  }, [props.event]);

  useEffect(() => {
    console.log('dummy events updated:', props.dummyEvent);
    setDummyEvents(props.dummyEvent.dummyEvents);
  }, [props.dummyEvent]);

  useEffect(() => {
    // console.log("props.cart updated:", props.cart);
    setCart(props.cart.cartItems);
    const allConfirmed = props.cart.cartItems.every((item) => item.status === 'CONFIRMED');
    setAreAllItemsConfirmed(allConfirmed);
  }, [props.cart]);

  useEffect(() => {
    console.log('UPDATING props.video updated:', props.video);
    setVideos(props.video.videos);
  }, [props.video]);

  // useEffect(() => {
  //     console.log("props.isSaved updated:", props.cart.isSaved);
  //     setVideos(props.cart.isSaved);
  //   }, [props.cart]);

  // const renderVideoSlider =(videos)=>{
  //     console.log("inside render video slider",videos)
  //     return <VideoSlider videos ={videos} handleAddEvent={handleDummyEvents}/>
  // }

  const handleSaveButtonClick = () => {
    props.setModalState({
      visible: true,
      modalName: 'addToCart',
      // modalContent: props.ticket.ticket.id
    });
    // props.eventSaved()
    // props.ticketSaved()
    // const events = getEventIdsByStatus('checked', props.event.events.events);
    // props.cartSaved();
    // const cart = props.cart.cartItems;
    // props.updateEventStatus({ status: 'saved', event_ids: events });
    props.createCart(props.ticket.ticket.id, { TicketId: props.ticket.ticket.id, cartItems: cart });
    // props.updateDummyEventStatus({"status":"saved", "event_ids":events})
    // props.updateCartItemStatus()
    // props.dummyEventsSaved();
    // props.eventsSaved();
    // console.log("handledd save button")
  };

  const getEventIdsByStatus = (status, events) => {
    // console.log("   inside getCheckedEventIds", status)
    const checkedEvents = events.filter((event) => event.status === status);
    const checkedEventIds = checkedEvents.map((event) => event.id);
    return checkedEventIds;
  };

  const handleConfirmButtonClick = () => {
    props.setModalState({
      visible: true,
      modalName: 'confirmTicket',
      // modalContent: props.ticket.ticket.id
    });

    // const events=getEventIdsByStatus("saved",props.event.events.events)
    // props.updateEventStatus({"status":"confirmed", "event_ids":events})
    // // props.updateDummyEventStatus({"status":"confirmed", "event_ids":dummyEvents})
    // console.log("updating cart item status")
    // props.updateCartItemStatus(props.ticket.ticket.id,{"status":"confirmed","TicketId":props.ticket.ticket.id})
    // props.updateTicketStatus( props.ticket.ticket.id,
    //     {"status": "confirmed",
    //     "ticket_id": props.ticket.ticket.id}
    //      )
    // props.confirmEvents()
    // props.cartconfirmed()

    console.log('handled confirm button');
  };

  // const handleSaveButtonClick =()=>{

  // }

  const handleEventSaveButtonClick = () => {
    const events = getEventIdsByStatus('checked', props.event.events.events);
    console.log('CHECKED EVENTS: ', events);
    if (events.length > 0) {
      setSelectedEvents(events);

      props.setModalState({
        visible: true,
        modalName: 'addToCart',
        modalContent: events,
      });

      // props.eventAddToCart();
      props.updateEventStatus({ status: 'ADDED_TO_CART', event_ids: events });
      // props.addToCart()
    } else {
      alert('Please select some events first!');
      // Display an error message or take any appropriate action
    }
    // props.addToCart()
  };

  const handleDummyEventSaveButtonClick = () => {
    const events = getEventIdsByStatus('checked', props.dummyEvent.dummyEvents.dummyEvents);
    console.log('handling adding dummy event to cart', events);
    const sortedEvents = props.dummyEvent.dummyEvents.dummyEvents
      .filter((event) => {
        if (Array.isArray(events)) {
          return events.includes(event.id) && event.status === 'checked';
        }
        return false;
      })
      .map((event) => ({ ...event, status: 'ADDED_TO_CART' }));
    console.log('sorted events', sortedEvents);
    props.dummyEventAddToCart();
  };

  const handleClearButtonClick = () => {
    const events = getEventIdsByStatus('ADDED_TO_CART', props.event.events.events);
    const dummyEvents = getEventIdsByStatus('ADDED_TO_CART', props.dummyEvent.dummyEvents.dummyEvents);

    // re setting events in backend db
    props.updateEventStatus({ status: 'processing', event_ids: events });
    props.updateDummyEventStatus({ status: 'processing', event_ids: dummyEvents });
    // props.deleteCartItems(props.ticket.ticket.id);
    // clearing cart in global state

    props.cartCleared();
    // clearing events and dummy events in global state
    props.resetEvents();
    props.resetDummyEvents();
  };

  const handleDummyEvents = async () => {
    console.log('store ID', props.ticket.ticket.store_Id);
    await props.fetchStoreProductsList({ locationId: props.ticket.ticket.store_Id });
  };

  useEffect(() => {
    if (props.product.products.updatedVariants) {
      props.setModalState({
        visible: true,
        modalName: 'viewStoreProducts',
        modalContent: props.product.products.updatedVariants,
      });
    }
  }, [props.product]);
  const navigate = useNavigate();

  useEffect(() => {
    // ... your other code

    // Redirect to /dashboard/tickets when going back to this page
    const handlePopState = () => {
      navigate('/dashboard/tickets');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  console.log('SELECTED EVENTS: ', selectedEvents);
  console.log('props.eventAddToCart', props.eventAddToCart);
  // console.log("inside video page")
  return (
    <Container maxWidth={false} className={classes.pageContainer}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} md={8} className={classes.leftContainer}>
          <Paper className={classes.videoContainer}>
            {props.video.count > 0 ? (
              <VideoSlider
                // videos={videos}
                handleAddEvent={handleDummyEvents}
              />
            ) : (
              <span
                style={{
                  display: 'flex',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                No Video Available
              </span>
            )}
          </Paper>

          <div className={classes.cartScroller}>
            <Typography
              variant="h6"
              gutterBottom
              className={classes.header}
              style={{ alignSelf: 'flex-start', marginTop: '10px', fontSize: '1.5rem', width: '20%' }}
            >
              Cart
            </Typography>
            <Paper className={classes.cartContainer}>
              <div className={classes.cartDivs}>
                {cart ? (
                  <CartContainer />
                ) : (
                  <span
                    style={{
                      display: 'flex',
                      height: '100%',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'black',
                    }}
                  >
                    No items added to Cart yet
                  </span>
                )}
              </div>
            </Paper>
            <div className={classes.cartButtons}>
              {/* <IconButton
                style={{
                  // position: 'absolute',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
                onClick={handleDummyEvents}
              >
                <Add />
              </IconButton> */}
              <IconButton
                style={{
                  // position: 'absolute',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
                onClick={() => {
                  if (areAllItemsConfirmed) {
                    return alert('Cannot remove confirmed items from cart!');
                  }
                  console.log('HELLO');
                  return handleClearButtonClick;
                }}
              >
                <Clear />
              </IconButton>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={4} className={classes.rightContainer}>
          <Typography variant="h6" gutterBottom className={classes.header}>
            Events
          </Typography>
          <div className={classes.eventScroller}>
            <Paper className={classes.eventContainer}>
              {events ? (
                <div>
                  <EventContainer />
                </div>
              ) : null}
            </Paper>
          </div>
          <div className={classes.eventButtons} style={{ backgroundColor: 'white' }}>
            <div
              style={{
                position: 'absolute',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Button variant="contained" color="primary" onClick={handleEventSaveButtonClick}>
                Review & Add To Cart
              </Button>
            </div>
          </div>
          <div style={{ marginTop: '10px', height: '100%', maxHeight: '35vh' }}>
            <Typography variant="h6" gutterBottom className={classes.header}>
              Dummy Events
            </Typography>
            <div className={classes.eventScroller}>
              <Paper className={classes.eventContainer}>
                <div>
                  {props.dummyEvent.count > 0 ? (
                    <DummyEventContainer />
                  ) : (
                    <Typography>No dummy events Available</Typography>
                  )}
                </div>
              </Paper>
              <div className={classes.eventButtons} style={{ backgroundColor: 'white' }}>
                {/* <div
                  style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <Button variant="contained" color="primary" onClick={handleEventSaveButtonClick}>
                    Add
                  </Button>
                </div> */}
                {/* <IconButton
                  style={{
                    // alignSelf:"flex-start",
                    //   position: 'absolute',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                  onClick={handleDummyEvents}
                >
                  <Add />
                </IconButton> */}
                {/* <IconButton
                  style={{
                    // position: 'absolute',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                  onClick={handleDummyEventSaveButtonClick}
                >
                  <AbcRounded />
                </IconButton> */}
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <Button variant="contained" color="primary" onClick={handleDummyEvents}>
                    Add Dummy Event
                  </Button>
                </div>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <Button variant="contained" color="primary" onClick={handleDummyEventSaveButtonClick}>
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Paper className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="success"
              style={{ color: 'white', height: '3rem' }}
              onClick={handleConfirmButtonClick}
            >
              Confirm Ticket
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ color: 'white', height: '3rem' }}
              onClick={handleClearButtonClick}
            >
              Delete Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {props.modal.visible && props.modal.modalName === 'addToCart' ? (
        <ModalWrapper modalContent={selectedEvents} addToCartAction={props.eventAddToCart} />
      ) : props.modal.visible ? (
        <div>
          <ModalWrapper />
        </div>
      ) : (
        console.log('null condition')
      )}
    </Container>
  );
};

const mapStateToProps = ({ event, isloading, cart, video, ticket, modal, dummyEvent, product }) => ({
  event,
  isloading,
  cart,
  video,
  ticket,
  modal,
  dummyEvent,
  product,
});

export default connect(mapStateToProps, {
  fetchEventList,
  fetchVideoList,
  cartSaved,
  cartCleared,
  setModalState,
  updateCartTicket,
  eventsSaved,
  ticketConfirmed,
  resetEvents,
  updateTicketStatus,
  updateEventStatus,
  createCart,
  fetchCartList,
  resetDummyEvents,
  updateCartItemStatus,
  deleteCartItems,
  confirmEvents,
  cartconfirmed,
  dummyEventsSaved,
  fetchStoreProductsList,
  eventAddToCart,
  addToCart,
  dummyEventAddToCart,
  updateDummyEventStatus,
  createDummyEvents,
  fetchDummyEventList,
})(TicketPage);
