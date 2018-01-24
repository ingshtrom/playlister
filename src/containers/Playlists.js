import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const playlists = [
  {
    id: '9jf0290fj29fj',
    name: 'cool playlist 1',
    notes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    videoCount: 12,
    createdOn: new Date(),
    updatedOn: new Date(),
  },
  {
    id: '9jf0290fj29f3j',
    name: 'cool playlist 2',
    notes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    videoCount: 3,
    createdOn: new Date(),
    updatedOn: new Date(),
  },
  {
    id: '9jf0290fj29f4j',
    name: 'cool playlist 3',
    notes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    videoCount: 5,
    createdOn: new Date(),
    updatedOn: new Date(),
  },
  {
    id: '9jf0290fj29dfjskalfj',
    name: 'cool playlist 4',
    notes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    videoCount: 2,
    createdOn: new Date(),
    updatedOn: new Date(),
  }
];

class Playlists extends Component {
  constructor(props) {
    super(props);

    this.displayPlaylist = this.displayPlaylist.bind(this);
  }

  // expect an object with properties 'id', 'name', 'notes', 'videoCount', 'updatedOn', 'createdOn'
  displayPlaylist(playlist) {
    return (
        <Link to={'/playlist/' + playlist.id} className='list-group-item list-group-item-action flex-column align-items-start' key={playlist.id}>
          <div className='d-flex w-100 justify-content-between'>
            <h5 className='mb-1 text-primary'>{playlist.name}</h5>
            <span>
              <small className='badge badge-primary'>
                {playlist.videoCount} videos
              </small>
            </span>
          </div>
          <p className='mb-1'>{playlist.notes}</p>
          <div className='mt-2 d-flex w-100'>
            <small className="badge badge-secondary">
              Updated: {playlist.updatedOn.toLocaleString()}
            </small>
          </div>
        </Link>
    );
  }

  render() {
    return (
      <div className='list-group'>
        {playlists.map(this.displayPlaylist)}
      </div>
    )
  }
}

export default Playlists;
